const formatDate = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const isToday = now.toDateString() === createdDate.toDateString();
  const isYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString() === createdDate.toDateString();

  if (isToday) {
    return createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday) {
    return `Вчера, ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
  };
};

export default formatDate;
