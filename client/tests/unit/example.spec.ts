import { shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";

describe("Home.vue", () => {
  it("renders", (): void => {
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch("Webbuilder");
  });
});
