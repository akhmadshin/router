import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { postQueryOptions } from '../utils/posts'
import { PostErrorComponent } from './posts.$postId'

export const Route = createFileRoute('/posts_/$postId/deep')({
  loader: async ({ params: { postId }, context, cause }) => {
    if (cause !== 'preload' || typeof window !== 'undefined') {
      return;
    }

    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(postId),
    )

    return {
      title: data.title,
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const { postId } = Route.useParams()
  const postQuery = useQuery(postQueryOptions(postId))

  if (!postQuery.data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="p-2 space-y-2">
      <Link
        to="/posts"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{postQuery.data.title}</h4>
      <div className="text-sm">{postQuery.data.body}</div>
    </div>
  )
}
