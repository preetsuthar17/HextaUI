import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <footer>
      <div className="mt-20 border-t py-10 h-full flex items-center text-center justify-center  bg-homecards flex-col-reverse gap-4">
        <a
          href="https://www.producthunt.com/posts/hextaui-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hextaui&#0045;2"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=768925&theme=dark"
            alt="HextaUI - Build&#0032;stunning&#0032;websites&#0032;with&#0032;less&#0032;effort | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
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
