// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";
import CodeSlide from "spectacle-code-slide";

// fancy!
import { graphql } from "react-apollo";
import TOUR_QUERY from "./tour.graphql";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#122b45"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const extractRepoInfo = (fullName) => fullName.split("/");

const CodeTour = ({ tour, loading, error }) => {
  if (loading) {
    return (
      <Deck transition={[]} transitionDuration={0} theme={theme}>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Loading your tour...
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            \o/
          </Text>
        </Slide>
      </Deck>
    );
  }

  const { targetRepository, description, steps } = tour;

  const [, targetName] = extractRepoInfo(targetRepository);

  // for each step, add an "intro" slide and create slides for each sections
  const allStepsSlides = steps
    .map((step) => [
      <Slide
        key={`step-intro-${step._id}`}
        transition={["fade"]}
        bgColor="tertiary"
      >
        <Heading size={3} textColor="primary">{step.title}</Heading>
      </Slide>,
      ...step.sections.map((section) => (
        <Slide
          key={`step-section-${section.slug}-${step._id}`}
          transition={["fade"]}
          bgColor="quartenary"
        >
          <Heading size={3} textColor="primary">
            section: {section.slug}
          </Heading>
        </Slide>
      ))
    ])
    .reduce((slides, stepSlides) => [...slides, ...stepSlides], []);

  return (
    <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
      {/* welcome slide */}
      <Slide transition={["fade"]} bgColor="primary">
        <Heading size={3} lineHeight={1} textColor="secondary">
          {targetName}
        </Heading>
        <Text margin="10px 0 0" textColor="tertiary" size={1} caps>
          {description}
        </Text>
      </Slide>
      {/* steps overview */}
      <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
        <Heading size={6} textColor="secondary" caps>Steps</Heading>
        <List ordered>
          {steps.map(({ _id, title }) => (
            <ListItem key={`item-${_id}`}>{title}</ListItem>
          ))}
        </List>
      </Slide>
      {/* steps loop */}
      {allStepsSlides.map((element) => React.cloneElement(element))}
      {/* will be used inside the allStepsSlides for each step :) */}
      <CodeSlide
        transition={[]}
        lang="js"
        code={require("raw-loader!../assets/deck.example")}
        bgColor="quartenary"
        ranges={[
          { loc: [0, 28], title: "Test code slide!" },
          { loc: [0, 1], title: "The Beginning" },
          { loc: [1, 2] },
          { loc: [1, 2], note: "Heres a note!" },
          { loc: [2, 3] },
          { loc: [8, 10] }
        ]}
      />
      {/* conclusion slide */}
      <Slide transition={["fade"]} bgColor="primary">
        <Heading size={3} textColor="tertiary">
          Go to the code shown
        </Heading>
        <Heading size={3} textColor="quarternary">
          Help make this tour better
        </Heading>
      </Slide>
    </Deck>
  );
};

export default graphql(TOUR_QUERY, {
  options: ({ tourRepository }) => ({ variables: { tourRepository } }),
  props: ({ data: { tour, loading, error } }) => ({
    tour,
    loading,
    error
  })
})(CodeTour);
