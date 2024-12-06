import {DarkThemeToggle} from "flowbite-react";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import AppLogo from "@/app/ui/AppLogo";

export const AppFooter = ()=> {

  return <Footer container>
    <div className="w-full">
      <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
        <DarkThemeToggle />
      {/*  <div>*/}
          <AppLogo className="mx-auto w-16" alt="logo" />
      {/*  </div>*/}
      {/*  <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">*/}
      {/*    */}

      {/*  </div>*/}
      </div>
      <FooterDivider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <FooterCopyright href="#" by="Deschide.MD™" year={2024} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <FooterIcon href="#" icon={()=><FontAwesomeIcon icon={faFacebook} />} />
          <FooterIcon href="#" icon={()=><FontAwesomeIcon icon={faInstagram} />} />
          <FooterIcon href="#" icon={()=><FontAwesomeIcon icon={faTwitter} />} />

        </div>
      </div>
    </div>
  </Footer>

}