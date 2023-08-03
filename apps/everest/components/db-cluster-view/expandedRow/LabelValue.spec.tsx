import React from "react";
import { render, screen } from "@testing-library/react";
import { LabelValue } from "./LabelValue";

describe('LabelValue', () => {
  it('should show nothing if no value is passed', () => {
    render(<LabelValue label="My Label" />);
    expect(screen.queryByText('My Label')).not.toBeInTheDocument();
  });

  it('should show nothing if empty string is passed', () => {
    render(<LabelValue label="My Label" value="" />);
    expect(screen.queryByText('My Label')).not.toBeInTheDocument();
  });

  it('should show nothing if undefined is passed', () => {
    render(<LabelValue label="My Label" value={undefined} />);
    expect(screen.queryByText('My Label')).not.toBeInTheDocument();
  });

  it('should show correctly if 0 is passed', () => {
    render(<LabelValue label="My Label" value={0} />);
    expect(screen.queryByText('My Label')).toBeInTheDocument();
    expect(screen.queryByText('0')).toBeInTheDocument();
  });

  it('should show correctly', () => {
    render(<LabelValue label="My Label" value="Value 1" />);
    expect(screen.queryByText('My Label')).toBeInTheDocument();
    expect(screen.queryByText('Value 1')).toBeInTheDocument();
  });
});