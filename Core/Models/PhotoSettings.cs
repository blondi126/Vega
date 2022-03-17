using System.Drawing;

namespace Vega.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public int MaxPixels {get; set; }
        public string[]? AcceptedFileTypes { get; set; }

        public bool IsSupported(string fileName)
        {
            return AcceptedFileTypes!.Any(s => s == Path.GetExtension(fileName).ToLower());
        }

        public Image? GetThumbnail(Stream resourceImage)
        {
            try
            {
                var image = Image.FromStream(resourceImage);
                var newSize = GetThumbSize(image.Size);

                var thumb = image.GetThumbnailImage(newSize.Width, newSize.Height, () => false, IntPtr.Zero);

                return thumb;
            }
            catch 
            {
                return null;
            }
        }

        public Size GetThumbSize(Size oldSize)
        {
            var width = oldSize.Width;
            var height = oldSize.Height;

            double coef = 0;
            coef = width>height ? (double)MaxPixels/width : (double)MaxPixels/height;

            return new Size((int)(width*coef),(int)(height*coef));
        }
    }
}