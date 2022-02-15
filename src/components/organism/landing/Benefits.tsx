import Image from 'next/image';

import { BenefitOne, BenefitThree, BenefitTwo } from '@/assets/images';

export const Benefits = () => {
  return (
    <section id="benefits">
      <h1 className="section-title">Why Waysbucks?</h1>
      <div id="benefit-one">
        <div className="img-container benefit-img">
          <Image
            src={BenefitOne}
            alt="coffee beans"
            layout="responsive"
            objectFit="cover"
            className="rounded-md"
            width={150}
            height={150}
          />
        </div>
        <div className="benefit-desc">
          <h2>Quality First</h2>
          <p>Waysbucks concern in quality first to serve the best coffee</p>
        </div>
      </div>
      <div id="benefit-two">
        <div className="img-container benefit-img">
          <Image
            src={BenefitTwo}
            alt="coffee blend"
            layout="responsive"
            objectFit="cover"
            className="rounded-md"
            width={150}
            height={150}
          />
        </div>
        <div className="benefit-desc">
          <h2>Accessibility</h2>
          <p>
            You can find and buy our products via online or just visit our branch stores spread across several areas
          </p>
        </div>
      </div>
      <div id="benefit-three">
        <div className="img-container benefit-img">
          <Image
            src={BenefitThree}
            alt="woman drink coffee"
            layout="responsive"
            objectFit="cover"
            className="rounded-md"
            width={150}
            height={150}
          />
        </div>
        <div className="benefit-desc">
          <h2>Varied Menu</h2>
          <p>Waysbuck provide over 150+ variants and also various toppings that you can combine them</p>
        </div>
      </div>
    </section>
  );
};
