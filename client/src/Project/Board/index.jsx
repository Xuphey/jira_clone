import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';

import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import IssueDetails from './IssueDetails';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project, fetchProject, updateLocalProjectIssues }) => {
  const match = useMatch('/project/board');
  const navigate = useNavigate();

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      <Breadcrumbs items={['Projects', project.name, 'Kanban Board']} />
      <Header />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Lists
        project={project}
        filters={filters}
        updateLocalProjectIssues={updateLocalProjectIssues}
      />
      <Routes>
        <Route
          path="issues/:issueId"
          render={routeProps => (
            <Modal
              isOpen
              testid="modal:issue-details"
              width={1040}
              withCloseIcon={false}
              onClose={() => navigate(match.pathnameBase)}
              renderContent={modal => (
                <IssueDetails
                  issueId={routeProps.match.params.issueId}
                  projectUsers={project.users}
                  fetchProject={fetchProject}
                  updateLocalProjectIssues={updateLocalProjectIssues}
                  modalClose={modal.close}
                />
              )}
            />
          )}
        />
      </Routes>
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
