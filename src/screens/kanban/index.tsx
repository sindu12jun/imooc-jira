import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbanSearchParams, useProjectInUrl } from "screens/kanban/util";
import { KanbanColumn } from "screens/kanban/kanban-column";
import styled from "@emotion/styled";
import { useKanbans } from "utils/kanban";
import { SearchPanel } from "screens/kanban/search-panel";
import { ScreenContainer } from "components/lib";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
