import Post from '../interfaces/post'
import { Card } from 'flowbite-react';

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

function createTopicHeader(topic: string): string {
  const words = topic.split('-');
  const capitalizedWords = words.map((word: string) => {
    const capitalizedFirstLetter = word[0].toUpperCase();
    const finalWord = `${capitalizedFirstLetter}${word.slice(1)}`;
    return finalWord;
  })

  return capitalizedWords.join(' ');

}

function createCard(topic: string) {
  return (
    <div className="flex justify-center text-6xl border-2 border-gray-300 rounded-xl p-6 bg-gray-100">
      <Card imgSrc={`/assets/topics/${topic}.jpeg`}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {createTopicHeader(topic)}
        </h5>
        {/*<p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>*/}
      </Card>
    </div>
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

