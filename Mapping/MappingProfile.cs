using AutoMapper;
using Vega.Controllers.Resources;
using Vega.Core.Models;
using Vega.Models;

namespace Vega.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, IdNamePairResource>();
            CreateMap<Model, IdNamePairResource>();
            CreateMap<Feature, IdNamePairResource>();
            CreateMap<Contact, ContactResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember( vr => vr.Features, opt => opt.MapFrom( v => v.Features.Select(vf => vf.Id)));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember( vr => vr.Make, opt => opt.MapFrom(v => v.Model!.Make))
                .ForMember( vr => vr.Features, opt => opt.MapFrom( v => v.Features.Select(vf => new IdNamePairResource {Id = vf.Id, Name = vf.Name})));
           

            // API Resource to Domain
            CreateMap<ContactResource, Contact>();
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember( v => v.Id, opt => opt.Ignore())
                .ForMember( v => v.Features, opt => opt.Ignore())
            ;

           
        }
    }
}