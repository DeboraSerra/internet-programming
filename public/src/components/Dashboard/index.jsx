function Dashboard() {
  const tasks = [
    {
      date: '07-10-2024',
      items: [
        { name: 'DBMS Presentation', priority: 'high' },
        { name: 'DBMS Assignment', priority: 'medium' },
        { name: 'Read tech news', priority: 'low' },
      ],
    },
    {
      date: '08-10-2024',
      items: [
        { name: 'Web development assignment', priority: 'medium' },
      ],
    },

  ];

  return (
    <div>
      <div>
        <button>+</button>
        
      </div>
      <div>
        {tasks.map((task, index) => (
          <div key={index}>
            <div>{task.date}</div>
            {task.items.map((item, idx) => (
              <div key={idx}>
                <input type="checkbox" />
                <div>{item.name}</div>
                <div>{item.priority}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

