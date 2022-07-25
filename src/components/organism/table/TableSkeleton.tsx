import { Button } from '@/components/atoms';

export const TableSkeleton = () => {
  const render = () => {
    let elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push(
        <tr key={i} className="skeleton skeleton-wave">
          <td>
            <span className="h-7 w-4/5" />
          </td>
          <td className="table-name">
            <span className="left h-7 w-4/5" />
          </td>
          <td className="table-image">
            <span className="h-full w-full" />
          </td>
          <td className="table-price">
            <span className="h-7 w-4/5" />
          </td>
          <td>
            <span className="h-7 w-7" />
          </td>
          <td>
            <Button
              id="update-skeleton"
              color="secondary"
              isDisabled
              className="m-1 w-20"
              style={{ padding: '0.25rem' }}>
              Update
            </Button>
            <Button
              id="delete-skeleton"
              variant="outlined"
              color="danger"
              isDisabled
              className="m-1 w-20"
              style={{ padding: '0.25rem' }}>
              Delete
            </Button>
          </td>
        </tr>,
      );
    }
    return elements;
  };
  return <>{render()}</>;
};
