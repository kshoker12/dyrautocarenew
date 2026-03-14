'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { route } from '@/lib/routes';
import { normalizePath } from '@/lib/helpers';

export default function ServiceCard({ className, cardData }) {
  const router = useRouter();
  const imageSrc = normalizePath(cardData?.image || '/images/bg2.jpg');

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader shadow={false} floated={false} className="h-96 relative">
        <Image src={imageSrc} alt="card-image" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
      </CardHeader>
      <CardBody className='flex-grow'>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {cardData.name}
          </Typography>
        </div>
        <ul className="flex flex-col mb-1">
          {cardData.packages?.map((pack) => (
            <li key={pack.name} className="flex items-center gap-0.5">
              <i className="fas fa-check text-primary-orange mr-2" />
              <Typography className="font-normal">{pack.name}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={() => router.push(route(cardData.codeName))}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
