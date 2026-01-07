import React from "react";
import { mount } from "cypress/react";
import Counter from "../../src/Counter";

describe("Counter component", () => {
  it("renders initial value", () => {
    mount(<Counter initialValue={3} />);
    cy.contains("Value: 3").should("exist");
  });

  it("increments value on + click", () => {
    mount(<Counter initialValue={1} />);
    cy.contains("+").click();
    cy.contains("Value: 2").should("exist");
  });

  it("decrements value on - click", () => {
    mount(<Counter initialValue={2} />);
    cy.contains("-").click();
    cy.contains("Value: 1").should("exist");
  });
});
