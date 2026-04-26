import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import {
  originationVolume,
  delinquencyByCategory,
  riskTierComposition,
  summaryStats,
  yoyGrowth,
  delinquencyTrend,
} from '../data/loanDashboardData';

// Chart.js registration
// Imported conditionally per Gatsby SSR constraints. Actual render is
// gated behind a `mounted` flag so canvas is never touched server-side.
let Line; let Bar; let Doughnut;
if (typeof window !== 'undefined') {
  const {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } = require('chart.js');
  const chartjs2 = require('react-chartjs-2');
  Line = chartjs2.Line;
  Bar = chartjs2.Bar;
  Doughnut = chartjs2.Doughnut;
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  );
}

// Styled components
const StyledMain = styled.main`
  padding: 100px 0 80px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    padding: 100px 40px 80px;
  }
  @media (max-width: 768px) {
    padding: 80px 20px 60px;
  }
`;

const StyledHeader = styled.header`
  margin-bottom: 60px;

  .overline {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  h1 {
    color: var(--lightest-slate);
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 700;
    margin: 0 0 16px;
    line-height: 1.1;
  }

  p {
    color: var(--slate);
    font-size: var(--fz-lg);
    max-width: 600px;
    margin: 0;
    line-height: 1.6;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    margin-top: 20px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 3px;
    border: 1px solid var(--green);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    background: var(--green-tint);
  }
`;

const StyledStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledStatCard = styled.div`
  background: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 24px;
  border: 1px solid var(--lightest-navy);
  transition: var(--transition);

  &:hover {
    border-color: var(--green);
    transform: translateY(-3px);
  }

  .stat-label {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }

  .stat-value {
    color: var(--lightest-slate);
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-sub {
    color: ${({ positive }) => (positive ? 'var(--green)' : '#f28b50')};
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;

const StyledChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
`;

const StyledChartRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledChartCard = styled.div`
  background: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 28px;
  border: 1px solid var(--lightest-navy);

  .chart-title {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    margin: 0 0 4px;
  }

  .chart-subtitle {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    margin: 0 0 24px;
  }

  .chart-container {
    position: relative;
  }
`;

const StyledSkeleton = styled.div`
  background: linear-gradient(
    90deg,
    var(--lightest-navy) 25%,
    var(--navy) 50%,
    var(--lightest-navy) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--border-radius);

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Chart configuration helpers
const baseOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: '#a8b2d1',
        font: { family: '\'SF Mono\', \'Fira Code\', monospace', size: 12 },
        usePointStyle: true,
        pointStyleWidth: 10,
      },
    },
    tooltip: {
      backgroundColor: '#0a192f',
      borderColor: '#233554',
      borderWidth: 1,
      titleColor: '#ccd6f6',
      bodyColor: '#a8b2d1',
      padding: 12,
      cornerRadius: 4,
    },
  },
  scales: {
    x: {
      ticks: { color: '#8892b0', font: { size: 12 } },
      grid: { color: 'rgba(35, 53, 84, 0.6)', drawBorder: false },
    },
    y: {
      ticks: { color: '#8892b0', font: { size: 12 } },
      grid: { color: 'rgba(35, 53, 84, 0.6)', drawBorder: false },
    },
  },
};

const lineData = {
  labels: originationVolume.labels,
  datasets: [
    {
      label: 'Origination Volume ($M)',
      data: originationVolume.values,
      borderColor: '#64ffda',
      backgroundColor: 'rgba(100, 255, 218, 0.08)',
      pointBackgroundColor: '#64ffda',
      pointRadius: 4,
      pointHoverRadius: 7,
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  ...baseOptions,
  plugins: {
    ...baseOptions.plugins,
    tooltip: {
      ...baseOptions.plugins.tooltip,
      callbacks: {
        label: ctx => ` $${ctx.parsed.y.toFixed(1)}M`,
      },
    },
  },
  scales: {
    ...baseOptions.scales,
    y: {
      ...baseOptions.scales.y,
      ticks: {
        ...baseOptions.scales.y.ticks,
        callback: v => `$${v}M`,
      },
    },
  },
};

const barData = {
  labels: delinquencyByCategory.labels,
  datasets: [
    {
      label: '30+ DPD Rate (%)',
      data: delinquencyByCategory.values,
      backgroundColor: [
        'rgba(100, 255, 218, 0.75)',
        'rgba(87, 203, 255, 0.75)',
        'rgba(245, 125, 255, 0.75)',
        'rgba(255, 198, 87, 0.75)',
        'rgba(255, 130, 87, 0.75)',
      ],
      borderColor: ['#64ffda', '#57cbff', '#f57dff', '#ffc657', '#ff8257'],
      borderWidth: 1.5,
      borderRadius: 4,
      hoverBackgroundColor: [
        'rgba(100, 255, 218, 0.95)',
        'rgba(87, 203, 255, 0.95)',
        'rgba(245, 125, 255, 0.95)',
        'rgba(255, 198, 87, 0.95)',
        'rgba(255, 130, 87, 0.95)',
      ],
    },
  ],
};

const barOptions = {
  ...baseOptions,
  plugins: {
    ...baseOptions.plugins,
    legend: { display: false },
    tooltip: {
      ...baseOptions.plugins.tooltip,
      callbacks: {
        label: ctx => ` ${ctx.parsed.y.toFixed(1)}%`,
      },
    },
  },
  scales: {
    ...baseOptions.scales,
    y: {
      ...baseOptions.scales.y,
      ticks: {
        ...baseOptions.scales.y.ticks,
        callback: v => `${v}%`,
      },
      max: 9,
    },
  },
};

const donutData = {
  labels: riskTierComposition.labels,
  datasets: [
    {
      data: riskTierComposition.values,
      backgroundColor: [
        'rgba(100, 255, 218, 0.8)',
        'rgba(87, 203, 255, 0.8)',
        'rgba(245, 125, 255, 0.8)',
      ],
      borderColor: ['#64ffda', '#57cbff', '#f57dff'],
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

const donutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '68%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#a8b2d1',
        font: { family: '\'SF Mono\', \'Fira Code\', monospace', size: 11 },
        usePointStyle: true,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: '#0a192f',
      borderColor: '#233554',
      borderWidth: 1,
      titleColor: '#ccd6f6',
      bodyColor: '#a8b2d1',
      padding: 12,
      cornerRadius: 4,
      callbacks: {
        label: ctx => ` ${ctx.parsed}% of portfolio`,
      },
    },
  },
};

// Page component
const LoanPortfolioDashboard = ({ location }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Loan Portfolio Dashboard" />

      <StyledMain>
        <StyledHeader>
          <p className="overline">Featured Project</p>
          <h1>Loan Portfolio Dashboard</h1>
          <p>
            Interactive financial data visualization tracking origination volume, delinquency rates,
            and risk-tier composition across a synthetic $4.8B consumer lending book.
          </p>
          <div className="badge">
            {['React', 'Chart.js', 'Gatsby', 'Styled Components', 'Data Visualization'].map(t => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </StyledHeader>

        {/* KPI Row */}
        <StyledStatsGrid>
          <StyledStatCard positive={true}>
            <p className="stat-label">Total Portfolio Value</p>
            <p className="stat-value">{summaryStats.totalPortfolioValue}</p>
            <p className="stat-sub">{yoyGrowth} YoY</p>
          </StyledStatCard>

          <StyledStatCard positive={true}>
            <p className="stat-label">On-Time Payment Rate</p>
            <p className="stat-value">{summaryStats.onTimePaymentRate}</p>
            <p className="stat-sub">+ 0.8pp vs prior year</p>
          </StyledStatCard>

          <StyledStatCard positive={false}>
            <p className="stat-label">Avg Interest Rate</p>
            <p className="stat-value">{summaryStats.avgInterestRate}</p>
            <p className="stat-sub">+ 1.2pp vs 2023</p>
          </StyledStatCard>

          <StyledStatCard positive={true}>
            <p className="stat-label">Active Borrowers</p>
            <p className="stat-value">{summaryStats.activeBorrowers}</p>
            <p className="stat-sub">Delinquency {delinquencyTrend} YoY</p>
          </StyledStatCard>
        </StyledStatsGrid>

        {/* Charts */}
        <StyledChartsGrid>
          {/* Line chart - full width */}
          <StyledChartCard>
            <h2 className="chart-title">Monthly Origination Volume</h2>
            <p className="chart-subtitle">Trailing 12 months - $ millions funded</p>
            <div className="chart-container">
              {mounted && Line ? (
                <Line data={lineData} options={lineOptions} />
              ) : (
                <StyledSkeleton style={{ height: 300 }} />
              )}
            </div>
          </StyledChartCard>

          {/* Bar + Donut side by side */}
          <StyledChartRow>
            <StyledChartCard>
              <h2 className="chart-title">Delinquency by Category</h2>
              <p className="chart-subtitle">30+ days past due - % of outstanding balance</p>
              <div className="chart-container">
                {mounted && Bar ? (
                  <Bar data={barData} options={barOptions} />
                ) : (
                  <StyledSkeleton style={{ height: 280 }} />
                )}
              </div>
            </StyledChartCard>

            <StyledChartCard>
              <h2 className="chart-title">Risk Tier Composition</h2>
              <p className="chart-subtitle">% of total outstanding balance - FICO-based</p>
              <div className="chart-container">
                {mounted && Doughnut ? (
                  <Doughnut data={donutData} options={donutOptions} />
                ) : (
                  <StyledSkeleton style={{ height: 280 }} />
                )}
              </div>
            </StyledChartCard>
          </StyledChartRow>
        </StyledChartsGrid>

        <p
          style={{
            marginTop: 48,
            color: 'var(--dark-slate)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fz-xxs)',
            textAlign: 'center',
          }}>
          All data is synthetic and generated for demonstration purposes only.
        </p>
      </StyledMain>
    </Layout>
  );
};

LoanPortfolioDashboard.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LoanPortfolioDashboard;
