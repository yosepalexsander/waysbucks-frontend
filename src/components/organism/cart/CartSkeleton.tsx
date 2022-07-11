export const CartSkeleton = () => {
  return (
    <div className="cart-container">
      <div className="cart-list">
        {[1, 2].map((index) => (
          <div key={index} className="cart-item skeleton skeleton-wave">
            <span className="cart-img" />
            <div className="cart-info flex-1">
              <span className="h-4/5" />
              <span className="h-1/2" />
            </div>
            <div className="cart-info">
              <span className="h-4/5 w-full" />
              <div className="qty h-1/2">
                <span className="h-full w-6" />
                <span className="h-full w-6" />
                <span className="mx-3 h-full w-6" />
                <span className="h-full w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
