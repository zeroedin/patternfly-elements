import { storiesOf } from "@storybook/polymer";
import "../dist/pfe-carousel";

storiesOf("Carousel", module).add(
  "pfe-carousel",
  () => `
  <pfe-carousel>
    Carousel
  </pfe-carousel>
  `
);
