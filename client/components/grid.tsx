import Post from '../interfaces/post'
import Link from 'next/link';
import { Card } from 'flowbite-react';
import { convertDashToUpperCase } from '../lib/helper'

type Props = {
  allPosts: Post[]
}


function getTopics(allPosts: Post[]): string[] {
  const topicSet = {};

  allPosts.forEach(post => {
    if (post.topic) {
      topicSet[post.topic] = true;
    }
  })

  return Object.keys(topicSet);
}



function createCard(topic: string) {
  return (
    //<div className="flex justify-center text-6xl border-2 border-gray-300 rounded-xl p-6 bg-gray-100">
      <Link href={`/topics/${topic}`} id={topic}>
        <Card imgSrc={`/assets/topics/${topic}.jpeg`} >
          <h5 className="text-lg md:text-base font-bold tracking-tight text-gray-900 dark:text-white">
            {convertDashToUpperCase(topic)}
          </h5>
          {/*<p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>*/}
        </Card>
      </Link>
    //</div>
  )
}


export default function Grid({ allPosts }: Props) {
  const topics = getTopics(allPosts);

  return (
    <>
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <>
          {topics.map((topic: string) => createCard(topic))}
        </>
      </div>
      <br />
    </div>
    </>
  );
}

