import React from 'react';
import PropTypes from 'prop-types';
import ProjectCaseStudy from '@components/project-case-study';
import { graphUiSystems } from '../../data/seniorProjects';

const GraphUiSystemsPage = ({ location }) => (
  <ProjectCaseStudy location={location} project={graphUiSystems} />
);

GraphUiSystemsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GraphUiSystemsPage;
