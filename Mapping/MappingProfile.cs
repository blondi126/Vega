using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResouce>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Contact, ContactResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember( vr => vr.Features, opt => opt.MapFrom( v => v.Features.Select(vf => vf.Id)))
            ;
           

            // API Resource to Domain
            CreateMap<ContactResource, Contact>();
            CreateMap<VehicleResource, Vehicle>()
                .ForMember( v => v.Id, opt => opt.Ignore())
                .ForMember( v => v.Features, opt => opt.Ignore())
            ;

           
        }
    }
}