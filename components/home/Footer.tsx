import { Star } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <footer>
      <div className="mt-20 border-t py-10 h-full flex items-center text-center justify-center  bg-homecards flex-col-reverse gap-4">
        <Link
          href="https://github.com/sponsors/preetsuthar17"
          target="_blank"
          className="px-6 bg-linear-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10  hover:fill-yellow-300"
        >
          <Star size={15} fill="yellow" /> Sponsor HextaUI
        </Link>
        <div>
          <p className="text-primary/70">
            Made with ❤️ by{" "}
            <Link href="https://x.com/preetsuthar17" className="text-primary">
              @preett
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
