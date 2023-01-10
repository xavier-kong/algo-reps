import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { getAllPosts, getQuestionsByTopic } from '../../lib/api'
import PostTitle from '../../components/post-title'

type Props = {
  questions: Question[]
}

interface Question {
    slug: string,
    ranking: number
};

function createCard(question: Question) {
  return (

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
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <>
                {
                  questions.map((question: Question) => {

                  })
                }

                </>
              </div>
              <br />
            </div>


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
