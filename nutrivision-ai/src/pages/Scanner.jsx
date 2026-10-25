import { useState } from 'react'
import { Upload, ScanLine } from 'lucide-react'
export default function Scanner() {
  const [preview, setPreview] = useState('')
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold">AI Food Scanner</h2>
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        {!preview ? (
          <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm font-medium">Click to upload food image</span>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
          </label>
        ) : (
          <div>
            <img src={preview} className="max-h-96 w-full object-contain rounded-xl" />
            <button onClick={() => setPreview('')} className="mt-4 text-red-500 text-sm">Remove image</button>
            <button className="mt-4 w-full bg-[#21633c] text-white py-3 rounded-xl flex justify-center items-center gap-2"><ScanLine size={18}/> Analyze Image</button>
          </div>
        )}
      </div>
    </div>
  )
}
