import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbanSearchParams, useProjectInUrl } from "screens/kanban/util";
import { KanbanColumn } from "screens/kanban/kanban-column";
import styled from "@emotion/styled";
import { useKanbans } from "utils/kanban";
import { SearchPanel } from "screens/kanban/search-panel";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
