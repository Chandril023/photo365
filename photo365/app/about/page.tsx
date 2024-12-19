import Link from "next/link";
const About = () => {
  return (
    <>
     <section className="bg-white dark:bg-transparent">
    <div className="gap-16 items-center py-8 px-8 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-8">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Photographer , Footballer</h2>
            <p className="mb-4">Aloha.I am Arghyadeep Naskar,a freelance photographer and videographer with a passion for capturing moments that tell compelling stories. Through my lens, I strive to blend creativity with technical precision to deliver visual narratives that resonate. </p>
            <p>Whether it&apos;s freezing a fleeting expression or crafting a cinematic sequence, I am dedicated to exceeding expectations and bringing visions to life. With a keen eye for detail and a commitment to excellence, I specialize in creating impactful imagery that leaves a lasting impression.</p>
            <div className="flex flex-row justify-left items-left my-10">
        </div>
        </div>
      
        <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/>
        </div>
    </div>

</section>
    </>
  );
}

export default About;
