import React from "react";
import PageTitle from "../../components/Common/PageTitle";

function AboutScreen() {
  return (
    <div>
      <div className="p-4">
        <div className="bg-white rounded-xl p-3 font-title">
          <PageTitle title="About Me" />
            <div>
              <a
                href="https://github.com/"
                target={"_blank"}
                className="underline cursor-pointer"
                rel="noreferrer"
              >
                Hi, I'm Aisha Jaweria
              </a>
              <h1> Free Invoice Maker for your business.</h1>
            </div>
          </div>

          <PageTitle title="Invoice Maker" />
          <div className="mt-2 pl-4 text-sm">
            <ul class="list-disc">
              <li> Can Easily Pre-Manage Your Products</li>
              <li> Can Easily Pre-Manage Your Clients</li>
              <li> Can Export PDF </li>
              <li> Can Export Image </li>
            </ul>
          </div>
          <div className="font-title mt-3 mb-5">
            <div>
              <a
                href="https://github.com/lwinmoepaing/invoice-maker"
                className="underline cursor-pointer"
                target={"_blank"}
                rel="noreferrer"
              >
                {" "}
                Repo Link Here
              </a>
            </div>
          </div>

          <PageTitle title="Build By" />
          <div className="mt-2 mb-5 pl-4 text-sm">
            <ul class="list-disc">
              <li> Framer Motion For each component Animation</li>
              <li> Lottiefiles For Dashboard Widgets Icons</li>
              <li> IndexedDB for Local Storage </li>
              <li> ReactJS </li>
            </ul>
          </div>

          <PageTitle title="Contact" />
          <div className="mt-2 pl-1 text-sm">
            <a
              href="tel:+92333856444"
              className="underline cursor-pointer"
              target={"_blank"}
              rel="noreferrer"
            >
              {" "}
              +92333856444
            </a>
          </div>
        </div>
      </div>
    
  );
}
export default AboutScreen;
