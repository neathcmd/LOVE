import { BookOpen, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const StoriesEN = () => {
  const { theme } = useTheme();

  return (
    <div className="container max-w-4xl mx-auto px-6 pb-24">
      <div
        className={`bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 ${
          theme === "dark"
            ? "bg-opacity-10 shadow-gray-900"
            : "bg-opacity-50 shadow-gray-200"
        } transition-all duration-1000 delay-300`}
      >
        <div className="flex items-center mb-6">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
              theme === "dark" ? "bg-pink-900" : "bg-pink-100"
            }`}
          >
            <BookOpen
              className={theme === "dark" ? "text-pink-300" : "text-pink-600"}
              size={20}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              Chapter 1: The Day It All Began
            </h2>
            <div className="flex items-center mt-2">
              <Calendar
                size={16}
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              />
              <p className="ml-2 text-lg font-medium">February 16, 2025</p>
            </div>
          </div>
        </div>

        <div
          className={`prose lg:prose-lg ${
            theme === "dark" ? "prose-invert" : ""
          } max-w-none`}
        >
          <p className="text-lg leading-relaxed">The Day Everything Began:</p>

          <p className="text-lg leading-relaxed mt-4">
            It was Saturday, February 15th a typical weekend at the school
            library. The day was filled with laughter, funny jokes from all the
            volunteers, and a joyful atmosphere that made everything feel light
            and cheerful. It truly was a wonderful weekend. As closing time
            approached, most of the volunteers had already left. Only two of us
            stayed behind to tidy up the place me and a girl. She was kind,
            helpful, and what stood out the most was how she liked to do
            everything on her own, just like I used to be. We worked side by
            side, finishing up the last tasks of the day. While we we tidy up
          </p>

          <p className="text-lg leading-relaxed mt-4">
            She said that the next day, Sunday, February 16th, 2025, there would
            be a psychology class held in the library for the entire morning.
            Because of that, we needed to open the library earlier than usual
            unlike our typical schedule where we only opened on Saturdays. She
            asked me to help her prepare. At first, I hesitated, but when she
            explained that she’d be alone and needed someone else to help
            oversee things, I agreed. I promised her I would come.
          </p>

          <p className="text-lg leading-relaxed mt-4 italic">
            "I never imagined that this day would change our relationship so
            much…"
          </p>

          <p className="text-lg leading-relaxed mt-4">
            On the morning of February 16th, at exactly 7:20 a.m., I arrived as
            promised. I saw her there first and asked,{" "}
            <span className="italic">
              "Oh, you’re here already? Even earlier than me."
            </span>{" "}
            She smiled and said,{" "}
            <span className="italic">"I thought maybe you wouldn’t come."</span>{" "}
            I replied with a shy laugh,{" "}
            <span className="italic">
              "How could I not come after making a promise?"
            </span>{" "}
            We then started arranging the room to be ready in time for the
            class. While the psychology session was happening, we sat and
            chatted, getting to know each other more. But I sensed that
            something was bothering her. She seemed different like she was
            holding back some kind of sadness. Curious and concerned, I gently
            asked her,{" "}
            <span className="italic">
              "Is something bothering you? You don't look happy and cheerful
              today."
            </span>
          </p>

          <p className="text-lg leading-relaxed mt-4">
            She looked at me and asked,{" "}
            <span className="italic">"Would you be upset if I told you?"</span>{" "}
            I replied,{" "}
            <span className="italic">
              "It's okay I don't mind You can tell me."
            </span>
          </p>

          <p className="text-lg leading-relaxed mt-4">
            After a moment of hesitation, she finally said,{" "}
            <span className="italic">
              "Actually… I have a boyfriend. But he doesn’t really treat me
              well. He keeps hurting my feelings over and over again. That’s why
              I’ve been feeling so down lately…"
            </span>
          </p>

          <p className="text-lg leading-relaxed mt-4">
            I listened to her with empathy. I understood her, I had experienced
            something similar myself. So I decided to stay by her side, talk to
            her, and try to lift her spirits.
          </p>

          <p className="text-lg leading-relaxed mt-4">
            After a little while, she asked with a soft smile,{" "}
            <span className="italic">
              "Can we take a photo together? I've never had anyone take a photo
              with me as a couple before..."
            </span>{" "}
            Seeing her warm expression, I agreed. After we took the picture, she
            said,
            <span className="italic">
              "I’m really happy. I’m glad there’s someone who’s willing to
              listen to me without judging… someone like you."
            </span>
          </p>

          <p className="text-lg leading-relaxed mt-4">
            At the time, I didn’t think too deeply about it. I just thought it
            was a simple, kind moment.
          </p>

          <p className="text-lg leading-relaxed mt-4">
            At around 11:15 a.m., the class ended. All the students and the
            teacher had already left only the two of us remained. I saw her
            cleaning up, so I decided to stay and help, out of genuine care. She
            told me,{" "}
            <span className="italic">
              "It’s okay, I can clean by myself. You can go."
            </span>{" "}
            But I replied,{" "}
            <span className="italic">
              "It’s fine I’ll stay and help. I’m doing this from the bottom of
              my heart."
            </span>
          </p>

          <p className="text-lg leading-relaxed mt-4">
            She smiled with appreciation, and we continued cleaning together. I
            then asked her,{" "}
            <span className="italic">"Do you like coffee?"</span> She answered,{" "}
            <span className="italic">"Yes, I do!"</span> So I said,{" "}
            <span className="italic">
              "Once we’re done cleaning, I’d like to take you to a café. Would
              you be okay with that?"
            </span>{" "}
            She hesitated slightly, but eventually agreed, with a shy smile.
          </p>

          <p className="text-lg leading-relaxed mt-4">
            At 11:30 a.m., we went to the café together. We sat down, talked
            about our feelings and daily life, and shared laughter and smiles
            her beautiful smile glowing throughout. It was a warm and peaceful
            moment, just before we went our separate ways...
          </p>

          <p className="text-lg leading-relaxed mt-4">
            From that moment, I found myself thinking about her all the time. I
            didn’t know what this feeling was a strange mix of wanting and
            missing. I wanted to see her face every day, to be close to her, but
            we were like strangers. If I went a day without seeing her, I felt
            empty inside. I kept asking myself, Am I in love? Her beautiful
            smile, her joyful laughter stayed in my mind. But even with all
            these feelings, I never found a clear answer.
          </p>

          <div className="flex justify-center my-8">
            <div
              className={`h-px w-1/3 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          </div>
          <p className="text-lg leading-relaxed mt-4 italic">
            "From that moment, the connection between us started to grow. From
            just strangers slowly became two hearts getting closer together."
          </p>
        </div>

        {/* Chapter2 */}
        <div className="mt-8">
          {" "}
          <div className="flex items-center mb-6">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                theme === "dark" ? "bg-pink-900" : "bg-pink-100"
              }`}
            >
              <BookOpen
                className={theme === "dark" ? "text-pink-300" : "text-pink-600"}
                size={20}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                Chapter 2: Everything Started To Change
              </h2>
              <div className="flex items-center mt-2">
                <Calendar
                  size={16}
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                />
                <p className="ml-2 text-lg font-medium">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesEN;
