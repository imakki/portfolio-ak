import React from 'react';
import PropTypes from 'prop-types';
import ProjectCaseStudy from '@components/project-case-study';
import { brandStorePlatform } from '../../data/seniorProjects';

const BrandStorePlatformPage = ({ location }) => (
  <ProjectCaseStudy location={location} project={brandStorePlatform} />
);

BrandStorePlatformPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default BrandStorePlatformPage;
