import { useAppSelector } from '../index';

const RevisionPanel = () => {
  const testState = useAppSelector((state) => state);

  console.log('RevisionPanel', testState);

  return (
    <>
      <div>
        dataList:{' '}
        {testState.postSaveNewRevision.dataList.length
          ? testState.postSaveNewRevision.dataList
          : 'empty'}
      </div>
      <div>status: {testState.postSaveNewRevision.status}</div>
    </>
  );
};

export default RevisionPanel;
