import useSWR from 'swr';
import UserRow from '../components/UserRow';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserList = () => {

  const {
    data: users,
    error,
    isValidating
  } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

  
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return (
    <div className="Loading">
        <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
)

  return (
    <div className="container">
      <div className="card">
        <div className='card-body'>
          <table className='table'>
            <thead>
                <th>User</th>
                <th>Email</th>
                <th>Website</th>
                <th>Company</th>
                <th>Todos</th>
                <th>Album</th>
            </thead>
            <tbody>
                {users &&
                  users.map((user) => (
                    <UserRow key={user.id} id={user.id} name={user.name} email={user.email} website={user.website} company={user.company.name} />
                  ))}
            </tbody>
        </table>
        </div>
        
      </div>
        
    </div>
  )
}

export default UserList