import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/assets/icons';

export const Footer = () => {
  return (
    <footer>
      <div className="media-social">
        <a
          href="https://www.instagram.com/yosep_htjlu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Find me on Instagram">
          <InstagramIcon className="icons" />
        </a>
        <a
          href="https://github.com/yosepalexsander"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Let's collaborate with Github">
          <GithubIcon className="icons" />
        </a>
        <a
          href="https://linkedin.com/in/yosep-alexsander"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Find me on Linkedin">
          <LinkedinIcon className="icons" />
        </a>
      </div>
      <div className="information">
        <div className="more">
          <p className="h4 mb-4 uppercase">More Information</p>
          <p>About Us</p>
          <p>Carrer Center</p>
          <p>Store</p>
        </div>
        <div className="support">
          <p className="h4 mb-4 uppercase">Support</p>
          <p>Frequently Asked Questions</p>
        </div>
      </div>
      <p className="copyright">&copy;2021 Waysbucks Coffee by Yosep Alexsander</p>
    </footer>
  );
};
