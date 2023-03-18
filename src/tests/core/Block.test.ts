import { Block } from "core";

describe("./Block", () => {
  class testBlock extends Block<{ text: string }> {
    render() {
      return "<div></div>";
    }
  }

  it("should create resources on init", () => {
    const block = new testBlock({ text: "hello" });

    expect(block.element).not.toBeNull();
    expect(block.element?.tagName).toEqual("DIV");
  });

  it("setProps should set new props", () => {
    const block = new testBlock({ text: "text" });

    block.setProps({ text: "new text" });

    expect(block?.props?.text).toEqual("new text");
  });

  it("getProps should return props", () => {
    const block = new testBlock({ text: "some text" });
    const props = block.getProps();

    expect(props).toStrictEqual({ text: "some text" });
  });

  it("getProps should return prop by name", () => {
    const block = new testBlock({ text: "some text" });
    const prop = block.getProps("text");

    expect(prop).toEqual("some text");
  });

  it("should emit FLOW_CDU event after props have been updated", () => {
    const block = new testBlock({ text: "text" });
    const mock = jest.fn();

    block.eventBus().on(Block.EVENTS.FLOW_CDU, mock);

    block.setProps({ text: "new text" });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ text: "text" }, { text: "new text" });
  });
});
