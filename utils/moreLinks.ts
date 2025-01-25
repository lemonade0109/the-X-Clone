import { BsPin } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { ImEmbed2 } from "react-icons/im";
import { SiSimpleanalytics } from "react-icons/si";
import { GiHidden } from "react-icons/gi";

export const links = [
  { icon: BsPin, label: "Pin to your profile" },
  { href: "/#", label: "Remove from lists", icon: GoChecklist },
  { icon: GoMute, label: "Mute from lists" },
  { icon: IoChatbubbleEllipsesOutline, label: "Change who can reply" },
  { icon: ImEmbed2, label: "Embedded posts" },
  { href: "/#", icon: SiSimpleanalytics, label: "View post analytics" },
  { href: "/#", label: "View hidden replies", icon: GiHidden },
];
