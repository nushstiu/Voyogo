using Voyago.BusinessLayer.Services;

namespace Voyago.BusinessLayer;

public class BusinessLogic
{
    public DestinationService Destinations { get; } = new DestinationService();
    public TripService Trips { get; } = new TripService();
    public BookingService Bookings { get; } = new BookingService();
}