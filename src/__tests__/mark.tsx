import React from "react";
import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark 组件正确高亮关键词", () => {
  const name = "物料管理";
  const keyword = "管理";

  render(<Mark name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257AFD");
  expect(screen.getByText("物料")).not.toHaveStyle("color: #257AFD");
});
