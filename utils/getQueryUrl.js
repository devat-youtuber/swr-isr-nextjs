import { useRouter } from "next/router";

const getQueryUrl = () => {
  const router = useRouter();
  const { query } = router;
  let page = Number(query.page) >= 1 ? Number(query.page) : 1;
  let limit = Number(query.limit) >= 10 ? Number(query.limit) : 10;
  let search = query.search || '';

  return {
    router,
    page,
    limit,
    search
  }
}

export default getQueryUrl;