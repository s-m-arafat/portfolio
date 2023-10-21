import React from "react";
import Image from "next/image";

const socials = [
  {
    name: "facebook",
    link: "https://www.facebook.com/arft666",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0 0 48 48"
      >
        <linearGradient
          id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
          x1="9.993"
          x2="40.615"
          y1="9.993"
          y2="40.615"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#2aa4f4"></stop>
          <stop offset="1" stop-color="#007ad9"></stop>
        </linearGradient>
        <path
          fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
          d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
        ></path>
        <path
          fill="#fff"
          d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
        ></path>
      </svg>
    ),
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/shakil-mahmud-arafat/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0 0 48 48"
      >
        <path
          fill="#0288D1"
          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
        ></path>
        <path
          fill="#FFF"
          d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
        ></path>
      </svg>
    ),
  },
  {
    name: "github",
    link: "https://github.com/s-m-arafat",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0 0 48 48"
      >
        <path
          fill="#fff"
          d="M41,24c0,9.4-7.6,17-17,17S7,33.4,7,24S14.6,7,24,7S41,14.6,41,24z"
        ></path>
        <path
          fill="#455a64"
          d="M21 41v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-6.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h1.8c.2-.3.2-.6.2-1.1V36c0-2.2-1.9-5.2-4.3-5.2h-2.5c-2.3 0-4.3 3.1-4.3 5.2v3.9c0 .4.1.8.2 1.1L21 41 21 41zM40.1 26.4C40.1 26.4 40.1 26.4 40.1 26.4c0 0-1.3-.4-2.4-.4 0 0-.1 0-.1 0-1.1 0-2.9.3-2.9.3-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2-.3 3.1-.3 1.1 0 2.4.4 2.5.4.1 0 .1.1.1.2C40.2 26.3 40.2 26.4 40.1 26.4zM39.8 27.2C39.8 27.2 39.8 27.2 39.8 27.2c0 0-1.4-.4-2.6-.4-.9 0-3 .2-3.1.2-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2.2-.2 3.1-.2 1.3 0 2.6.4 2.6.4.1 0 .1.1.1.2C39.9 27.1 39.9 27.2 39.8 27.2zM7.8 26.4c-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.2.8-.2 2.4-.5 3.3-.5.8 0 3.5.2 3.6.2.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0-2.7-.2-3.5-.2C10.1 26 8.6 26.2 7.8 26.4 7.8 26.4 7.8 26.4 7.8 26.4zM8.2 27.9c0 0-.1 0-.1-.1 0-.1 0-.1 0-.2.1 0 1.4-.8 2.9-1 1.3-.2 4 .1 4.2.1.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0 0 0 0 0 0 0-2.8-.3-4.1-.1C9.6 27.1 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9z"
        ></path>
        <path
          fill="#455a64"
          d="M14.2,23.5c0-4.4,4.6-8.5,10.3-8.5c5.7,0,10.3,4,10.3,8.5S31.5,31,24.5,31S14.2,27.9,14.2,23.5z"
        ></path>
        <path
          fill="#455a64"
          d="M28.6 16.3c0 0 1.7-2.3 4.8-2.3 1.2 1.2.4 4.8 0 5.8L28.6 16.3zM20.4 16.3c0 0-1.7-2.3-4.8-2.3-1.2 1.2-.4 4.8 0 5.8L20.4 16.3zM20.1 35.9c0 0-2.3 0-2.8 0-1.2 0-2.3-.5-2.8-1.5-.6-1.1-1.1-2.3-2.6-3.3-.3-.2-.1-.4.4-.4.5.1 1.4.2 2.1 1.1.7.9 1.5 2 2.8 2 1.3 0 2.7 0 3.5-.9L20.1 35.9z"
        ></path>
        <path
          fill="#00bcd4"
          d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8 s16,7.2,16,16S32.8,40,24,40z"
        ></path>
      </svg>
    ),
  },
  {
    name: "mail",
    link: "mailto:shakilmahmudarafat@gmail.com",
    icon: (
      <svg
        enable-background="new 0 0 64 64"
        height="30"
        version="1.1"
        viewBox="0 0 64 64"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Layer_1">
          <g>
            <circle cx="32" cy="32" fill="#77B3D4" r="32" />
          </g>
          <g>
            <g opacity="0.2">
              <path
                d="M52,44c0,2.209-1.791,4-4,4H16c-2.209,0-4-1.791-4-4V24c0-2.209,1.791-4,4-4h32c2.209,0,4,1.791,4,4V44z"
                fill="#231F20"
              />
            </g>
            <g>
              <path
                d="M52,42c0,2.209-1.791,4-4,4H16c-2.209,0-4-1.791-4-4V22c0-2.209,1.791-4,4-4h32c2.209,0,4,1.791,4,4V42z"
                fill="#E0E0D1"
              />
            </g>
            <g opacity="0.2">
              <g>
                <path
                  d="M35.524,30.185c-1.938-2.146-5.109-2.146-7.047,0L13.05,43.228c-0.18,0.199-0.328,0.393-0.461,0.585      C13.29,45.119,14.549,46,16,46h32c1.451,0,2.71-0.881,3.411-2.187c-0.133-0.191-0.281-0.385-0.461-0.585L35.524,30.185z"
                  fill="#231F20"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M35.524,32c-1.938-1.9-5.109-1.9-7.047,0L13.05,43.546c-0.18,0.176-0.328,0.348-0.461,0.517      C13.29,45.22,14.549,46,16,46h32c1.451,0,2.71-0.78,3.411-1.936c-0.133-0.169-0.281-0.341-0.461-0.517L35.524,32z"
                  fill="#E0E0D1"
                />
              </g>
            </g>
            <g opacity="0.2">
              <g>
                <path
                  d="M12.589,20.187C13.29,18.881,14.549,18,16,18h32c1.451,0,2.71,0.881,3.411,2.187      c-0.133,0.191-0.281,0.385-0.461,0.585L35.524,33.815c-1.938,2.146-5.109,2.146-7.047,0L12.589,20.187z"
                  fill="#231F20"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M28.476,32c1.938,1.9,5.109,1.9,7.047,0L50.95,20.454c0.18-0.176,0.328-0.348,0.461-0.517      C50.71,18.78,49.451,18,48,18H16c-1.451,0-2.71,0.78-3.411,1.936c0.133,0.169,0.281,0.341,0.461,0.517L28.476,32z"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </g>
        </g>
        <g id="Layer_2" />
      </svg>
    ),
  },
];

export default function Portfolio() {
  return (
    <div className="">
      {/* introductory part starts */}
      {/* container */}
      <div className="w-full flex flex-col lg:flex-row items-center mt-4">
        <div className="w-1/2 bg-whte flex justify-center">
          <Image
            src="/images/profile.jpeg"
            height={300}
            width={300}
            alt="profile image of arafat"
            className="rounded-full object-none object-center  "
          />
        </div>
        <div className="w-full lg:w-1/2 bg-blck mt-4 dark:text-dark-1">
          <h1 className="text-4xl md:text-6xl font-bold pl-8 md:pl-6 lg:pl-0">
            SHAKIL MAHMUD <br />
            ARAFAT
          </h1>
          <p className=" text-base mt-4 w-full lg:w-2/3 px-6 lg:px-0 dark:text-dark-3">
            Undergrad EEE student with an interest in Machine Learning,
            Programming and VLSI
          </p>
          <div className="flex mt-4 lg:mt-8 justify-center lg:justify-start">
            {socials.map((social) => (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
                className="mr-4"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* divider line */}
      <span className="w-2/3 md:w-1/2 block mt-2 lg:mt-[2.5rem] mx-auto inset-x-1 -bottom-px h-[1px] dark:h-[0.5px] bg-gradient-to-r from-teal-500/0 via-green-400 to-teal"></span>
      {/* introductory part ends */}
    </div>
  );
}
