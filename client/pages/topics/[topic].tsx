import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { getAllPosts, getQuestionsByTopic } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { Timeline } from 'flowbite-react';

type Props = {
  questions: Question[]
}

interface Question {
    slug: string,
    ranking: number
};

function createTimelineItem(question: Question) {
  return (
    <Timeline.Item>
    </Timeline.Item>
  )
}

export default function Post({ questions }: Props) {
  const router = useRouter()
  if (!router.isFallback && !questions) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
         <>
           <Timeline>
             {
               questions
               .sort((a, b) => (a.ranking - b.ranking))
               .map((question: Question) => createTimelineItem(question))
             }
           </Timeline>
            </>
          )}
        </Container>
      </Layout>
    )
  }

  type Params = {
    params: {
      topic: string;
    }
  }

  export async function getStaticProps({ params }: Params) {
    const questions = getQuestionsByTopic(params.topic);

    return {
      props: {
        questions: questions
      },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug', 'topic']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          topic: post.topic,
        },
      }
    }),
    fallback: false,
  }
}
