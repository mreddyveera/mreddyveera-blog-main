import { Footer,FooterTitle,FooterLink,FooterLinkGroup, FooterDivider, FooterCopyright, FooterIcon } from "flowbite-react";
import {Link} from "react-router-dom";
import { FaFacebook, FaTelegram } from "react-icons/fa";

function FooterComp() {
  return (
    <Footer className="w-full border-t-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                Manikanta
              </span>{" "}
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
            <FooterTitle title='About'/>
            <FooterLinkGroup col>
              <FooterLink href="https://www.100jsprojects.com"
               target='_blank'
               rel="noopener noreferrer">
                100 JS Projects
              </FooterLink>
              <FooterLink href="/about"
               target='_blank'
               rel="noopener noreferrer">
                Manikanta's Blog
              </FooterLink>
            </FooterLinkGroup>
            </div>
            <div>
            <FooterTitle title='FOLLOW US'/>
            <FooterLinkGroup col>
              <FooterLink href="https://github.com/mreddyveera"
               target='_blank'
               rel="noopener noreferrer">
                Github
              </FooterLink>
              <FooterLink href="https://leetcode.com/u/ReddyVeeraManikanta/"
               target='_blank'
               rel="noopener noreferrer">
                LeetCode
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/in/mreddyveera/"
               target='_blank'
               rel="noopener noreferrer">
                LinkedIn
              </FooterLink>
            </FooterLinkGroup>
            </div>
            <div>
            <FooterTitle title='LEGAL'/>
            <FooterLinkGroup col>
              <FooterLink href="#"
               target='_blank'
               rel="noopener noreferrer">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#"
               target='_blank'
               rel="noopener noreferrer">
                Terms & Conditions
              </FooterLink>
            </FooterLinkGroup>
            </div>


          </div>
        </div>
      </div>
    </Footer>
  );
}


export default FooterComp;
