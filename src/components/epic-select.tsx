import React from "react";
import { IdSelect } from "components/id-select";
import { useEpics } from "utils/epic";

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: epics } = useEpics();
  return <IdSelect options={epics || []} {...props} />;
};
