import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig, workExperienceInYears } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { firstName } from '../../config';
import { Trans } from 'gatsby-plugin-react-i18next';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  a {
    text-decoration: underline;
  }
  span {
    color: var(--green);
  }
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 240px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">
        <Trans>aboutTitle</Trans>
      </h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              <Trans i18nKey="presentation" values={{ firstName }} />
            </p>
            <p>
              <Trans
                i18nKey="remoteJob"
                values={{ years: workExperienceInYears }}
                components={{ colored: <span /> }}
              />
            </p>
            <ul className="skills-list">
              <li key={0}>Backend</li>
              <li key={1}>Web and Mobile Frontend</li>
              <li key={2}>AI</li>
              <li key={3}>Augmented Reality</li>
              <li key={4}>Embedded Systems</li>
              <li key={5}>
                <Trans i18nKey="andMore" />
              </li>
            </ul>
            <p>
              <Trans i18nKey="git" components={{ bold: <strong /> }} />{' '}
              <Trans i18nKey="experience" components={{ colored: <span />, bold: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="books" />:
            </p>
          </div>

          <ul className="skills-list">
            <li key={0}>
              <a
                href="https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
                target="_blank" rel="noreferrer">
                Clean Code
              </a>
            </li>
            <li key={1}>
              <a
                href="https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
                target="_blank" rel="noreferrer">
                Grokking Algorithms
              </a>
            </li>

            <li key={2}>
              <a
                href="https://www.amazon.com.br/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
                target="_blank" rel="noreferrer">
                Pragmatic Programmer
              </a>
            </li>
            <li key={3}>
              <a
                href="https://www.amazon.com.br/System-Design-Interview-Insiders-Guide/dp/1736049119"
                target="_blank" rel="noreferrer">
                System Design Interview
              </a>
            </li>
            <li key={4}>
              <a
                href="https://www.amazon.com.br/Cracking-Coding-Interview-Programming-Questions/dp/0984782850"
                target="_blank" rel="noreferrer">
                Cracking the Coding Interview
              </a>
            </li>
            <li key={5}>
              <a
                href="https://www.amazon.com.br/Habits-Highly-Productive-Developers-English-ebook/dp/B08BF74RRG"
                target="_blank" rel="noreferrer">
                14 Habits of Highly Productive Developers
              </a>
            </li>
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={400}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
