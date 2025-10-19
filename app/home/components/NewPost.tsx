"use client";
import Modal from "@/app/components/Modal";
import Tooltip from "@/app/components/Tooltip";
import { RootState } from "@/app/store/store";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiImage, FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { createPost } from "@/app/home/utils/createPost";
import toast from "react-hot-toast";
import { auth } from "@/app/firebase";

export default function NewPost() {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);

  // اختيار صورة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // إزالة الصورة
  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handlePost = async () => {
    try {
      if (!content.trim() && !previewUrl) {
        toast.error("المنشور فارغ!");
        return;
      }

      toast.loading("جاري النشر...");

      const newPostId = await createPost({
        content,
        authorId: auth.currentUser?.uid,
        imageFile: selectedImage,
      });

      toast.dismiss();
      toast.success("تم النشر بنجاح 🎉");

      console.log("تم إنشاء المنشور:", newPostId);
      setContent("");
      removeImage();
      setModal(false);
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("حدث خطأ أثناء النشر 😞");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0d0d0d] py-8 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-3 items-center p-5 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300"
      >
        {/* صورة المستخدم */}
        <Tooltip message="الملف الشخصي">
          <Link
            href="/home/profile"
            className="hover:opacity-90 transition-opacity min-w-11 h-11 relative overflow-hidden rounded-full border-2 border-main"
          >
            <Image
              src={user.avatar || "/default_avatar.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </Link>
        </Tooltip>

        {/* زر فتح المودال */}
        <Tooltip message="أنشئ منشور">
          <button
            onClick={() => setModal(true)}
            className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full rounded-full text-right p-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            بم تفكر يا{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {user.userName.split(" ")[0]}؟
            </span>
          </button>
        </Tooltip>

        {/* المودال */}
        {modal && (
          <Modal
            head="إنشاء منشور"
            isOpen={modal}
            closeModal={() => setModal(false)}
          >
            <div className="p-6 space-y-6">
              {/* مربع النص */}
              <motion.textarea
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                placeholder="ما الذي تريد مشاركته اليوم؟"
                rows={previewUrl ? 1 : 6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-all duration-200 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
              />

              {/* عرض الصورة المختارة */}
              {previewUrl && (
                <div className="relative mt-4 max-h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <div className="relative w-full h-64">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <button
                    onClick={removeImage}
                    className="absolute top-2 left-2 bg-red-500 dark:bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* زر اختيار الصورة */}
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <FiImage className="w-5 h-5" />
                {previewUrl ? "تغيير الصورة" : "إضافة صورة"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* زر النشر */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePost}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm mt-4"
              >
                <FiSend className="w-4 h-4" />
                نشر
              </motion.button>
            </div>
          </Modal>
        )}
      </motion.div>
    </section>
  );
}
