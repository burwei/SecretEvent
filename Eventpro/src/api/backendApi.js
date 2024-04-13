async function getData(url) {
  try {
    const response = await fetch(url);
    const data = response.json()
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getPropositionByType(type) {
  const url = `/api/v1/getPropositionByType/${type}`;
  return await getData(url);
}

export async function getDescription(pid) {
  const url = `/api/v1/getProposition/${pid}`;
  const response = await getData(url);
  const description = response.data;

  const descriptionParts = description.split('\n');
  const firstSentence = descriptionParts[0];
  const remainingContent = descriptionParts.slice(1).join('\n');

  return {
    firstSentence,
    remainingContent,
  };
}
