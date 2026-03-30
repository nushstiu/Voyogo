using Microsoft.Extensions.Configuration;
using Voyago.BusinessLayer.Interfaces;
using Voyago.BusinessLayer.Structure;

namespace Voyago.BusinessLayer;

public class BusinessLogic
{
    private readonly IConfiguration _configuration;

    public BusinessLogic(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IAuthAction AuthAction() => new AuthAction(_configuration);
    public IUserAction UserAction() => new UserAction();
    public ITourAction TourAction() => new TourAction();
    public IDestinationAction DestinationAction() => new DestinationAction();
    public IBookingAction BookingAction() => new BookingAction();
}
