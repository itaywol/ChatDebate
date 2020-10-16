import React from "react";
import { Typography } from "@material-ui/core";
const About = ({ classes }) => {
  return (
    <div className={classes.aboutWrapper}>
      <Typography variant="h6">Dear Debater</Typography>

      <Typography>
        As you are all know - the American politics have changed dramatically
        over the years. Just in the last elections - we have all witnessed a
        drastic change in the approach to some of the most critical issues.
        <Typography>
          From economics, to globalization. From climate change to the supreme
          court and etc. The American nation has become more aware and involved
          in politics than ever before. Our team has acknowledged the needs of
          you, the peoples, to express your opinion on these critical matters,
          and debate them. To show the other side what you truly think and
          believe. This platform is here to provide. We welcome you to use the
          platform, swipe through different opponents and debate them. Use clean
          language - so we all can have fun, learn and see the POV of the other
          side. REMEMBER: YOU ARE THE COUNCIL OF YOUR SIDE. BEHAVE ACCORDINGLY.
        </Typography>
        <Typography>
          We will do whatever we can to make this platform better, more general
          and include other topics in the future. This is only the first beta,
          but rest assure that more cool features are coming soon! Any help in
          publishing the platform is deeply appreciated. And you are more than
          welcomed to contact use here[HyperLink].
        </Typography>
        <Typography>Yours, ChatDebate Team.</Typography>
      </Typography>
    </div>
  );
};

export default About;
