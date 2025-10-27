import getProducts from '@/actions/get-products';
import Container from '@/components/container';
import PopularContent from '@/components/popular-content';
import { Button } from '@/components/ui/button';
import WhyChooseUsCard from '@/components/why-choose-us-card';
import { ArrowRight, FileHeart, Salad, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });

  const features = [
    {
      title: "Serve Healthy Food",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt",
      icon: <Salad className="w-8 h-8 text-hero" />,
    },
    {
      title: "Best Quality",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt",
      icon: <FileHeart className="w-8 h-8 text-hero" />,
    },
    {
      title: "Fast Delivery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium sunt",
      icon: <Truck className="w-8 h-8 text-hero" />,
    },
  ];

  console.log(products);
  return (
    <React.Fragment>
      <Container>
        <section className="grid grid-cols-1 md:grid-cols-2 px-4 sm:px-6 lg:px-12 pt-16 md:pt-28">
          <div className="flex flex-col items-start justify-start gap-4">
            <p className="px-6 py-1 rounded-full text-neutral-500 border border-gray-300">
              Hungry?
            </p>
            <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
              Just Come To <span className="block">Foofied & Order</span>
            </h2>
            <p className="text-base text-neutral-500 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, dignissimos aliquam.
            </p>
            <div className="my-4 flex items-center gap-4">
              <Link href="/menu">
                <Button
                  variant="outline"
                  className="w-40 md:w-48 h-10 flex justify-center items-center px-8 md:px-16 py-4 md:py-6 rounded-full text-black font-medium"
                >
                  Order Now
                </Button>
              </Link>
              <Link href="/menu">
                <Button
                  variant="secondary"
                  className="w-40 md:w-48 h-10 flex justify-center items-center gap-2 px-8 md:px-16 py-4 md:py-6 rounded-full text-black font-medium"
                >
                  Explore More
                  <ArrowRight className='w-8 h-3' />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[560px] flex items-center justify-center">
            <Image
              src="/images/hero.png"
              alt="Delicious food"
              fill
              className="object-contain"
              priority
            />
          </div>
        </section>

        <section className="flex flex-wrap justify-center items-center space-x-8 space-y-28 md:gap-12 my-4 py-12 px-4 sm:px-6 lg:px-12">
          {products.map((item) => (
            <PopularContent key={item.id} product={item} />
          ))}
        </section>

        <section className="my-4 py-12 flex flex-col items-center justify-center  px-4 sm:px-6 lg:px-12">
          <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
            Why choose us ?
          </h2>
          <p className="w-full text-center md:w-[560px] text-base text-neutral-500 my-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, commodi repellendus quod tempore reiciendis mollitia perferendis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 mt-20">
            {features.map((feat, idx) => (
              <WhyChooseUsCard
                key={idx}
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
              />
            ))}
          </div>
        </section>
      </Container>
    </React.Fragment>
  )
}

export default HomePage
