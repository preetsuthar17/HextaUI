import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <footer>
      <div className="mt-20 border-t py-10 h-full flex items-center text-center justify-center  bg-homecards flex-col-reverse gap-4">
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
