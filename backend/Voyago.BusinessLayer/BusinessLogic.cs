using Voyago.BusinessLayer.Interfaces;
using Voyago.BusinessLayer.Structure;

namespace Voyago.BusinessLayer;

public class BusinessLogic
{
    public IAuthAction AuthAction() => new AuthAction();
    public IUserAction UserAction() => new UserAction();
    public ITourAction TourAction() => new TourAction();
    public IDestinationAction DestinationAction() => new DestinationAction();
    public IBookingAction BookingAction() => new BookingAction();
}
