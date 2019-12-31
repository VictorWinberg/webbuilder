import { shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";

describe("Home.vue", (): void => {
  it("renders", (): void => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find("h3").text()).toMatch("Welcome to Your Webpage");
  });
});
