import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserRow = ({ name, email, website, company, id }) => {
    const {
        data: albums,
        error,
        isValidating
    } = useSWR(`https://jsonplaceholder.typicode.com/users/${id}/albums`, fetcher);

    const {
        data: todos
    } = useSWR(`https://jsonplaceholder.typicode.com/todos?userId=${id}`, fetcher);

    if(error) return <tr>Failed to load the data</tr>;
    if(isValidating) return (
        <tr>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </tr>
        
    )

    const profile = `/profile/${id}`

    return (
        <tr>
            <td><a className='text-primary fw-semibold' href={profile}>{name}</a></td>
            <td>{email}</td>
            <td><a target="_blank" href={`https://${website}`}>{website}</a></td>
            <td>{company}</td>
            <td>{todos && todos.length}</td>
            <td>{albums && albums.length}</td>
        </tr>
    )
}

export default UserRow