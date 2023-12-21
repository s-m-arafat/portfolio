import Image from "next/image";

export default function Card({
  Timeline,
  content,
  name,
  img,
  imgPlace = "left",
}) {
  return (
    // container wrapper
    <div
      className={`relative flex flex-col items-center lg:flex-row lg:justify-around ${
        imgPlace == "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* making sure the image is present */}
      {img && (
        <div className="lg:w-1/2 lg:flex lg:justify-center">
          <Image
            src={img}
            height={150}
            width={150}
            alt={name}
            className="lg:h-72 lg:w-72"
          />
        </div>
      )}
      {/* main card wrapper*/}
      <div
        className={`w-[90%] lg:w-1/2 lg:flex ${
          imgPlace === "right" ? "lg:justify-end" : "lg:justify-start"
        }`}
      >
        {/* design */}
        <div className="lg:w-[80%] bg-zinc-100 dark:bg-black-2 p-3 rounded-xl border dark:border-black-4/50">
          <h1 className="text-3xl font-bold text-center pb-2">{name}</h1>
          <ul className="border-l border-green-600/50 pl-2 lg:ml-2 lg:pl-0">
            {Timeline
              ? content.map((value, index) => (
                  <li key={index} className="ml-2 lg:ml-4">
                    <h3 className="text-lg font-semibold relative">
                      <div
                        className={`absolute w-4 h-4 rounded-full top-1 -left-6 ${
                          value.endDate === "present"
                            ? "bg-green-500"
                            : "ring-4 ring-inset ring-green-700 bg-zinc-100 dark:bg-black-2"
                        }`}
                      ></div>{" "}
                      {value?.institute}
                    </h3>
                    <div className="space-x-3 lg:space-x-6 py-2">
                      <span>{value.title}</span>
                      <span className="text-white-3">
                        {value?.startDate} - {value?.endDate}
                      </span>
                    </div>

                    <details className="w-[90%] overflow-hidden bg-zinc-200 dark:bg-black-3 p-1 pl-3 rounded-md max-h-8 min-h-8 ">
                      <summary className="text-sm cursor-pointer">
                        Details
                      </summary>
                      <p className="py-2 w-[90%] m-auto">{value?.description}</p>
                    </details>
                    <div className="border-b border-zinc-600/50 w-[80%] mx-auto my-2"></div>
                  </li>
                ))
              : "not timeline"}
          </ul>
        </div>

        {/* <button className="bg-green-400">+ Details</button> */}
      </div>
    </div>
  );
}
