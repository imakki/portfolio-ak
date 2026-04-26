import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMain = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 0 80px;

  @media (max-width: 1080px) {
    padding: 100px 40px 80px;
  }

  @media (max-width: 768px) {
    padding: 80px 25px 60px;
  }
`;

const StyledHeader = styled.header`
  margin-bottom: 50px;

  .eyebrow {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h1 {
    margin: 10px 0 18px;
    color: var(--lightest-slate);
    font-size: clamp(32px, 6vw, 56px);
    line-height: 1.05;
  }

  .summary {
    max-width: 760px;
    color: var(--light-slate);
    font-size: var(--fz-xl);
    line-height: 1.5;
  }
`;

const StyledMetaGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin: 35px 0 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  li {
    padding: 18px;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    background: var(--light-navy);
  }

  span {
    display: block;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  strong {
    display: block;
    margin-top: 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
  }
`;

const StyledContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 32px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSection = styled.section`
  margin-bottom: 28px;
  padding: 28px;
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  background: var(--light-navy);

  h2 {
    margin: 0 0 16px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  p {
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    margin: 0;
  }
`;

const StyledVisual = styled.aside`
  position: sticky;
  top: 110px;
  padding: 24px;
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  background: radial-gradient(circle at 25% 10%, rgba(100, 255, 218, 0.12), transparent 28%),
    var(--light-navy);

  @media (max-width: 900px) {
    position: static;
  }

  .panel {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: var(--border-radius);
    background: var(--navy);
    border: 1px solid var(--lightest-navy);
  }

  .panel-title {
    margin: 0 0 12px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .node {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid var(--lightest-navy);
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }

  .node strong {
    color: var(--lightest-slate);
  }

  .status {
    color: var(--green);
  }
`;

const StyledTechList = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;

  li {
    padding: 6px 10px;
    border-radius: var(--border-radius);
    background: var(--green-tint);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;

const ProjectCaseStudy = ({ location, project }) => (
  <Layout location={location}>
    <Helmet title={project.title} />
    <StyledMain>
      <StyledHeader>
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="summary">{project.summary}</p>
        <StyledTechList>
          {project.tech.map(item => (
            <li key={item}>{item}</li>
          ))}
        </StyledTechList>
        <StyledMetaGrid>
          {project.metrics.map(item => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </StyledMetaGrid>
      </StyledHeader>

      <StyledContentGrid>
        <div>
          {project.sections.map(section => (
            <StyledSection key={section.title}>
              <h2>{section.title}</h2>
              {section.body && <p>{section.body}</p>}
              {section.points && (
                <ul>
                  {section.points.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </StyledSection>
          ))}
        </div>

        <StyledVisual>
          {project.visualPanels.map(panel => (
            <div className="panel" key={panel.title}>
              <p className="panel-title">{panel.title}</p>
              {panel.rows.map(row => (
                <div className="node" key={row.label}>
                  <strong>{row.label}</strong>
                  <span className={row.status ? 'status' : undefined}>{row.value}</span>
                </div>
              ))}
            </div>
          ))}
        </StyledVisual>
      </StyledContentGrid>
    </StyledMain>
  </Layout>
);

ProjectCaseStudy.propTypes = {
  location: PropTypes.object.isRequired,
  project: PropTypes.shape({
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    metrics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string,
        points: PropTypes.arrayOf(PropTypes.string),
      }),
    ).isRequired,
    visualPanels: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        rows: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            status: PropTypes.bool,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ProjectCaseStudy;
